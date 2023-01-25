import { useEffect, useRef } from 'react';
import Label from './label';

/**
 * @ignore
 */
const Slider = (props) => {
  const { ariaLabelledby, ariaControls, classNames, formatLabel, maxValue, minValue, onSliderDrag, onSliderKeyDown, percentage, type, value } = props;
  const node = useRef(null)

  useEffect(() => {
    return () => {
      removeDocumentMouseMoveListener();
      removeDocumentMouseUpListener();
      removeDocumentTouchEndListener();
      removeDocumentTouchMoveListener();
    }
  }, [])

  const getStyle = () => {
    const perc = (percentage || 0) * 100;
    const style = {
      position: 'absolute',
      left: `${perc}%`,
    };
    return style;
  }

  const addDocumentMouseMoveListener = () => {
    removeDocumentMouseMoveListener();
    (node.current || {}).ownerDocument.addEventListener('mousemove', handleMouseMove);
  }

  const addDocumentMouseUpListener = () => {
    removeDocumentMouseUpListener();
    (node.current || {}).ownerDocument.addEventListener('mouseup', handleMouseUp);
  }

  const addDocumentTouchMoveListener = () => {
    removeDocumentTouchMoveListener();
    (node.current || {}).ownerDocument.addEventListener('touchmove', handleTouchMove);
  }

  const addDocumentTouchEndListener = () => {
    removeDocumentTouchEndListener();
    (node.current || {}).ownerDocument.addEventListener('touchend', handleTouchEnd);
  }

  const removeDocumentMouseMoveListener = () => {
    (node.current || {}).ownerDocument.removeEventListener('mousemove', handleMouseMove);
  }

  const removeDocumentMouseUpListener = () => {
    (node.current || {}).ownerDocument.removeEventListener('mouseup', handleMouseUp);
  }

  const removeDocumentTouchMoveListener = () => {
    (node.current || {}).ownerDocument.removeEventListener('touchmove', handleTouchMove);
  }

  const removeDocumentTouchEndListener = () => {
    (node.current || {}).ownerDocument.removeEventListener('touchend', handleTouchEnd);
  }

  const handleMouseDown = () => {
    addDocumentMouseMoveListener();
    addDocumentMouseUpListener();
  }

  const handleMouseUp = () => {
    removeDocumentMouseMoveListener();
    removeDocumentMouseUpListener();
  }

  const handleMouseMove = (event) => {
    onSliderDrag(event, type);
  }

  const handleTouchStart = () => {
    addDocumentTouchEndListener();
    addDocumentTouchMoveListener();
  }

  const handleTouchMove = (event) => {
    onSliderDrag(event, type);
  }

  const handleTouchEnd = () => {
    removeDocumentTouchMoveListener();
    removeDocumentTouchEndListener();
  }

  const handleKeyDown = (event) => {
    onSliderKeyDown(event, type);
  }

  const style = getStyle();

  return (
    <span
      className={classNames.sliderContainer}
      ref={node}
      style={style}>
      <Label
        classNames={classNames}
        formatLabel={formatLabel}
        type="value">
        {value}
      </Label>

      <div
        aria-labelledby={ariaLabelledby}
        aria-controls={ariaControls}
        aria-valuemax={maxValue}
        aria-valuemin={minValue}
        aria-valuenow={value}
        className={classNames.slider}
        draggable="false"
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        tabIndex="0" />
    </span>
  );

}

export default Slider;
