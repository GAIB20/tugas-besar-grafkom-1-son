function getMousePosition(canvas, e) {
    const pos = canvas.getBoundingClientRect();
    // const e = windows.event;
    const pos_x = e.clientX;
    const pos_y = e.clientY;
    const x = pos_x - pos.x;
    const y = pos_y - pos.y;
    return { x, y };
  }

  function getRGB(color) {
    const hexa_red = parseInt(color.substr(1, 2), 16);
    const hexa_green = parseInt(color.substr(3, 2), 16);
    const hexa_blue = parseInt(color.substr(5, 2), 16);
  
    const red = hexa_red / 255;
    const green = hexa_green / 255;
    const blue = hexa_blue / 255;
  
    return { red, green, blue };
  }
