import React, { useEffect, useRef, useState } from 'react';
import { getPercentagesFromValues, getValueFromProps, getValueFromPosition, getStepValueFromValue, getPositionsFromValues, getPositionFromEvent } from './value-transformer';
import DEFAULT_CLASS_NAMES from './default-class-names';
import Label from './label';
import Slider from './slider';
import Track from './track';
import { captialize, distanceTo, isDefined, isObject, length } from '../utils';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from './key-codes';

import { useAsyncReference } from "../../../utils/hooks";

const InputRange = (props) => {
  const { allowSameValues = false, ariaLabelledby, ariaControls, classNames = DEFAULT_CLASS_NAMES, disabled = false, draggableTrack, formatLabel, maxValue = 10, minValue = 0, name, onChangeStart, onChange, onChangeComplete, step = 1, value } = props;
  const asyncValue = useAsyncReference(value, true);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const [lastKeyMoved, setLastKeyMoved] = useState(null);
  const [startValue, setStartValue] = useState(null);
  const trackNode = useRef(null);
  const node = useRef(null);

  const getComponentClassName = () => {
    if (!disabled) {
      return classNames.inputRange;
    }
    return classNames.disabledInputRange;
  }

  const getTrackClientRect = () => {
    return trackNode.current.getClientRect();
  }

  const getKeyByPosition = (position) => {
    const values = getValueFromProps(props, isMultiValue());
    const positions = getPositionsFromValues(values, minValue, maxValue, getTrackClientRect());

    if (isMultiValue()) {
      const distanceToMin = distanceTo(position, positions.min);
      const distanceToMax = distanceTo(position, positions.max);

      if (distanceToMin < distanceToMax) {
        return 'min';
      }
    }
    return 'max';
  }

  const getKeys = () => {
    if (isMultiValue()) {
      return ['min', 'max'];
    }
    return ['max'];
  }

  const hasStepDifference = (values) => {
    const currentValues = getValueFromProps(props, isMultiValue());

    return length(values.min, currentValues.min) >= step ||
      length(values.max, currentValues.max) >= step;
  }

  const isMultiValue = () => {
    return isObject(value);
  }

  const isWithinRange = (values) => {
    if (isMultiValue()) {
      return values.min >= minValue &&
        values.max <= maxValue &&
        allowSameValues
        ? values.min <= values.max
        : values.min < values.max;
    }

    return values.max >= minValue && values.max <= maxValue;
  }

  const shouldUpdate = (values) => {
    return isWithinRange(values) && hasStepDifference(values);
  }

  const updatePosition = (key, position) => {
    const values = getValueFromProps(props, isMultiValue());
    const positions = getPositionsFromValues(values, minValue, maxValue, getTrackClientRect());

    positions[key] = position;
    setLastKeyMoved(key)

    updatePositions(positions);
  }


  const updatePositions = (positions) => {
    const values = {
      min: getValueFromPosition(positions.min, minValue, maxValue, getTrackClientRect()),
      max: getValueFromPosition(positions.max, minValue, maxValue, getTrackClientRect()),
    };
    const transformedValues = {
      min: getStepValueFromValue(values.min, step),
      max: getStepValueFromValue(values.max, step),
    };
    updateValues(transformedValues);
  }

  const updateValue = (key, value) => {
    const values = getValueFromProps(props, isMultiValue());
    values[key] = value;
    updateValues(values);
  }

  const updateValues = (values) => {
    if (!shouldUpdate(values)) {
      return;
    }
    onChange(isMultiValue() ? values : values.max);
  }

  const incrementValue = (key) => {
    const values = getValueFromProps(props, isMultiValue());
    const value = values[key] + step;
    updateValue(key, value);
  }

  const decrementValue = (key) => {
    const values = getValueFromProps(props, isMultiValue());
    const value = values[key] - step;
    updateValue(key, value);
  }

  const addDocumentMouseUpListener = () => {
    removeDocumentMouseUpListener();
    node.current.ownerDocument.addEventListener('mouseup', handleMouseUp);
  }

  const addDocumentTouchEndListener = () => {
    removeDocumentTouchEndListener();
    node.current.ownerDocument.addEventListener('touchend', handleTouchEnd);
  }

  const removeDocumentMouseUpListener = () => {
    node.current.ownerDocument.removeEventListener('mouseup', handleMouseUp);
  }

  const removeDocumentTouchEndListener = () => {
    node.current.ownerDocument.removeEventListener('touchend', handleTouchEnd);
  }

  const handleSliderDrag = (event, key) => {
    if (disabled) {
      return;
    }

    const position = getPositionFromEvent(event, getTrackClientRect());
    setIsSliderDragging(true);
    requestAnimationFrame(() => updatePosition(key, position));
  }

  const handleTrackDrag = (event, prevEvent) => {
    if (disabled || !draggableTrack || isSliderDragging) {
      return;
    }
    const {
      maxValue,
      minValue,
      value: { max, min },
    } = props;

    const position = getPositionFromEvent(event, getTrackClientRect());
    const value = getValueFromPosition(position, minValue, maxValue, getTrackClientRect());
    const stepValue = getStepValueFromValue(value, step);

    const prevPosition = getPositionFromEvent(prevEvent, getTrackClientRect());
    const prevValue = getValueFromPosition(prevPosition, minValue, maxValue, getTrackClientRect());
    const prevStepValue = getStepValueFromValue(prevValue, step);

    const offset = prevStepValue - stepValue;

    const transformedValues = {
      min: min - offset,
      max: max - offset,
    };

    updateValues(transformedValues);
  }

  const handleSliderKeyDown = (event, key) => {
    if (disabled) {
      return;
    }

    switch (event.keyCode) {
      case LEFT_ARROW:
      case DOWN_ARROW:
        event.preventDefault();
        decrementValue(key);
        break;

      case RIGHT_ARROW:
      case UP_ARROW:
        event.preventDefault();
        incrementValue(key);
        break;

      default:
        break;
    }
  }

  const handleTrackMouseDown = (event, position) => {
    if (disabled) {
      return;
    }

    const {
      maxValue,
      minValue,
      value: { max, min },
    } = props;

    event.preventDefault();

    const value = getValueFromPosition(position, minValue, maxValue, getTrackClientRect());
    const stepValue = getStepValueFromValue(value, step);

    if (!draggableTrack || stepValue > max || stepValue < min) {
      updatePosition(getKeyByPosition(position), position);
    }
  }

  const handleInteractionStart = () => {
    if (onChangeStart) {
      onChangeStart(asyncValue.current);
    }

    if (onChangeComplete && !isDefined(startValue)) {
      setStartValue(value);
    }
  }

  const handleInteractionEnd = () => {
    if (isSliderDragging) {
      setIsSliderDragging(false);
    }
    if (!onChangeComplete) {
      return;
    }

    if (startValue !== asyncValue.current) {
      onChangeComplete(asyncValue.current);
    }

    setStartValue(null)
  }

  const handleKeyDown = (event) => {
    handleInteractionStart(event);
  }

  const handleKeyUp = (event) => {
    handleInteractionEnd(event);
  }

  const handleMouseDown = (event) => {
    handleInteractionStart(event);
    addDocumentMouseUpListener();
  }

  const handleMouseUp = (event) => {
    handleInteractionEnd(event);
    removeDocumentMouseUpListener();
  }

  const handleTouchStart = (event) => {
    handleInteractionStart(event);
    addDocumentTouchEndListener();
  }

  const handleTouchEnd = (event) => {
    handleInteractionEnd(event);
    removeDocumentTouchEndListener();
  }

  const renderSliders = () => {
    const values = getValueFromProps(props, isMultiValue());
    const percentages = getPercentagesFromValues(values, minValue, maxValue);
    const keys = allowSameValues &&
      lastKeyMoved === 'min'
      ? getKeys().reverse()
      : getKeys();

    return keys.map((key) => {
      const value = values[key];
      const percentage = percentages[key];

      let { maxValue, minValue } = props;

      if (key === 'min') {
        maxValue = values.max;
      } else {
        minValue = values.min;
      }

      const slider = (
        <Slider
          ariaLabelledby={ariaLabelledby}
          ariaControls={ariaControls}
          classNames={classNames}
          formatLabel={formatLabel}
          key={key}
          maxValue={maxValue}
          minValue={minValue}
          onSliderDrag={handleSliderDrag}
          onSliderKeyDown={handleSliderKeyDown}
          percentage={percentage}
          type={key}
          value={value} />
      );

      return slider;
    });
  }

  const renderHiddenInputs = () => {
    if (!name) {
      return [];
    }

    const isMultiValue = isMultiValue();
    const values = getValueFromProps(props, isMultiValue);

    return getKeys().map((key) => {
      const value = values[key];
      const name = isMultiValue ? `${name}${captialize(key)}` : name;

      return (
        <input key={key} type="hidden" name={name} value={value} />
      );
    });
  }

  const componentClassName = getComponentClassName();
  const values = getValueFromProps(props, isMultiValue());
  const percentages = getPercentagesFromValues(values, minValue, maxValue);

  return (
    <div
      ref={node}
      aria-disabled={disabled}
      className={componentClassName}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}>
      <Label
        classNames={classNames}
        formatLabel={formatLabel}
        type="min">
        {minValue}
      </Label>

      <Track
        ref={trackNode}
        classNames={classNames}
        draggableTrack={draggableTrack}
        percentages={percentages}
        onTrackDrag={handleTrackDrag}
        onTrackMouseDown={handleTrackMouseDown}>
        {renderSliders()}
      </Track>

      <Label
        classNames={classNames}
        formatLabel={formatLabel}
        type="max">
        {maxValue}
      </Label>

      {renderHiddenInputs()}
    </div>
  );
}

export default InputRange;
