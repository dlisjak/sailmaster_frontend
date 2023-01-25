import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Track = (props, ref) => {
  const { children, classNames, draggableTrack, onTrackDrag, onTrackMouseDown, percentages } = props;
  const [trackDragEvent, setTrackDragEvent] = useState(null);
  const node = useRef(null);

  useImperativeHandle(ref, () => ({
    getClientRect: () => (node.current || {}).getBoundingClientRect()
  }))

  const getClientRect = () => {
    const rect = (node.current || {}).getBoundingClientRect();

    return rect;
  }

  const getActiveTrackStyle = () => {
    const width = `${(percentages.max - percentages.min) * 100}%`;
    const left = `${percentages.min * 100}%`;

    return { left, width };
  }

  const addDocumentMouseMoveListener = () => {
    removeDocumentMouseMoveListener();
    ((node.current || {}).ownerDocument || {}).addEventListener('mousemove', handleMouseMove);
  }

  const addDocumentMouseUpListener = () => {
    removeDocumentMouseUpListener();
    ((node.current || {}).ownerDocument || {}).addEventListener('mouseup', handleMouseUp);
  }

  const removeDocumentMouseMoveListener = () => {
    ((node.current || {}).ownerDocument || {}).removeEventListener('mousemove', handleMouseMove);
  }

  const removeDocumentMouseUpListener = () => {
    ((node.current || {}).ownerDocument || {}).removeEventListener('mouseup', handleMouseUp);
  }

  const handleMouseMove = (event) => {
    if (!draggableTrack) {
      return;
    }
    if (trackDragEvent !== null) {
      onTrackDrag(event, trackDragEvent);
    }
    setTrackDragEvent(event)
  }

  const handleMouseUp = () => {
    if (!draggableTrack) {
      return;
    }
    removeDocumentMouseMoveListener();
    removeDocumentMouseUpListener();
    setTrackDragEvent(null)
  }

  const handleMouseDown = (event) => {
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = getClientRect();

    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };
    onTrackMouseDown(event, position);
    if (draggableTrack) {
      addDocumentMouseMoveListener();
      addDocumentMouseUpListener();
    }
  }

  const handleTouchStart = (event) => {
    event.preventDefault();
    handleMouseDown(event);
  }

  const activeTrackStyle = getActiveTrackStyle();

  return (
    <div
      ref={node}
      className={classNames.track}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div
        style={activeTrackStyle}
        className={classNames.activeTrack} />
      {children}
    </div>
  );
}

export default forwardRef(Track);
