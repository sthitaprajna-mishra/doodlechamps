import { useEffect, useRef } from "react";

export function useOnDraw(onDraw) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef(null);

  const mouseMoveListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);

  let pointer = -1;
  const snapshots = [];

  function setCanvasRef(ref) {
    canvasRef.current = ref;
  }

  function onCanvasMouseDown() {
    isDrawingRef.current = true;
    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    snapshots.push(
      ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    );
    pointer = snapshots.length - 1;
    console.log(snapshots);
    console.log(`updated pointer: ${pointer}`);
  }

  function undo() {
    const ctx = canvasRef.current.getContext("2d");
    console.log(`pointer before: ${pointer}`);

    if (snapshots.length === 0) return;

    if (pointer <= 0) return;

    pointer--;

    console.log(`pointer after: ${pointer}`);
    ctx.putImageData(snapshots[pointer], 0, 0);
  }

  // function redo() {
  //   const ctx = canvasRef.current.getContext("2d");
  //   // console.log(snapshots);
  //   if (pointer === -1 || pointer === snapshots.length - 1) {
  //     return;
  //   } else {
  //     pointer++;
  //   }
  //   ctx.putImageData(snapshots[pointer], 0, 0);
  // }

  // Add a clear function to your Hooks.js
  function clear() {
    const ctx = canvasRef.current.getContext("2d");
    snapshots.length = 0;
    pointer = -1;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear the canvas
  }

  useEffect(() => {
    function computePointInCanvas(clientX, clientY) {
      if (canvasRef.current) {
        const boundingRect = canvasRef.current.getBoundingClientRect();
        return {
          x: clientX - boundingRect.left,
          y: clientY - boundingRect.top,
        };
      } else {
        return null;
      }
    }
    function initMouseMoveListener() {
      const mouseMoveListener = (e) => {
        if (isDrawingRef.current && canvasRef.current) {
          const point = computePointInCanvas(e.clientX, e.clientY);
          const ctx = canvasRef.current.getContext("2d");
          if (onDraw) onDraw(ctx, point, prevPointRef.current);
          prevPointRef.current = point;
          // console.log(point);
        }
      };
      mouseMoveListenerRef.current = mouseMoveListener;
      window.addEventListener("mousemove", mouseMoveListener);
    }

    function initMouseUpListener() {
      const listener = () => {
        isDrawingRef.current = false;
        prevPointRef.current = null;
      };
      mouseUpListenerRef.current = listener;
      window.addEventListener("mouseup", listener);
    }

    function cleanup() {
      if (mouseMoveListenerRef.current) {
        window.removeEventListener("mousemove", mouseMoveListenerRef.current);
      }
      if (mouseUpListenerRef.current) {
        window.removeEventListener("mouseup", mouseUpListenerRef.current);
      }
    }

    initMouseMoveListener();
    initMouseUpListener();
    return () => cleanup();
  }, [onDraw]);

  return {
    setCanvasRef,
    onCanvasMouseDown,
    undo,
    // redo,
    clear,
  };
}
