function getParams() {
  const url = new URL(window.location.href);
  const img = url.searchParams.get('img');
  const x = parseInt(url.searchParams.get('x'), 10);
  const y = parseInt(url.searchParams.get('y'), 10);
  const w = parseInt(url.searchParams.get('w'), 10);
  const h = parseInt(url.searchParams.get('h'), 10);
  return { img, x, y, w, h };
}

function showError(msg) {
  document.getElementById('message').textContent = msg;
}

function cropAndDraw(imgUrl, cropX, cropY, cropW, cropH) {
  const img = new Image();
  img.crossOrigin = "anonymous"; // required for remote images

  img.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = cropW;
    canvas.height = cropH;

    ctx.drawImage(
      img,
      cropX, cropY, cropW, cropH, // source
      0, 0, cropW, cropH          // destination
    );
  };

  img.onerror = () => {
    showError("Failed to load image. Make sure the URL is correct and supports cross-origin access.");
  };

  img.src = imgUrl;
}

(function main() {
  const { img, x, y, w, h } = getParams();

  if (!img || isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
    showError("Missing or invalid parameters. Please use: ?img=URL&x=INT&y=INT&w=INT&h=INT");
    return;
  }

  cropAndDraw(img, x, y, w, h);
})();
