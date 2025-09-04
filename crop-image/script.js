function getParams() {
  const url = new URL(window.location.href);
  const img = url.searchParams.get('img');
  const x = parseInt(url.searchParams.get('x'), 10);
  const y = parseInt(url.searchParams.get('y'), 10);
  const w = parseInt(url.searchParams.get('w'), 10);
  const h = parseInt(url.searchParams.get('h'), 10);
  return { img, x, y, w, h };
}

function isValidParams({ img, x, y, w, h }) {
  return (
    img &&
    !isNaN(x) && !isNaN(y) &&
    !isNaN(w) && !isNaN(h) &&
    w > 0 && h > 0
  );
}

function showHelp() {
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('help').style.display = 'block';
}

function cropAndDraw(imgUrl, cropX, cropY, cropW, cropH) {
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = cropW;
    canvas.height = cropH;

    ctx.drawImage(
      img,
      cropX, cropY, cropW, cropH,
      0, 0, cropW, cropH
    );
  };

  img.onerror = showHelp;
  img.src = imgUrl;
}

(function main() {
  const params = getParams();

  if (!isValidParams(params)) {
    showHelp();
    return;
  }

  cropAndDraw(params.img, params.x, params.y, params.w, params.h);
})();
