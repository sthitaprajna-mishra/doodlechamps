import { useOnDraw } from "./Hooks";

import "./Canvas.css";

const Canvas = () => {
  const { setCanvasRef, onCanvasMouseDown, undo, clear } = useOnDraw(onDraw);

  function onDraw(ctx, point, prevPoint) {
    drawLine(prevPoint, point, ctx, "#000000", 5);
  }

  function drawLine(start, end, ctx, color, width) {
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="border-1 col-span-12 grid bg-lightColor1 rounded-md md:col-span-8 dark:bg-darkColor2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 border bg-lightColor1 border-red-500 canvas-container">
          <canvas
            width={750}
            height={500}
            onMouseDown={onCanvasMouseDown}
            // style={canvasStyle}
            ref={setCanvasRef}
            className="border border-green-500"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            className="py-1 px-2 w-fit bg-blueColor1 text-lightColor1 rounded-full transition-all text-sm hover:bg-blueColor2 hover:cursor-pointer"
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="py-1 px-2 w-fit bg-blueColor1 text-lightColor1 rounded-full transition-all text-sm hover:bg-blueColor2 hover:cursor-pointer"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

const canvasStyle = {
  // border: "1px solid black",
  // "object-fit": "none",
  // width: "100%",
  // backgroundColor: "#ffffff",
};
