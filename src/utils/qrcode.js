import QRCode from "qrcodejs2"

/**
 * 二维码生成
 * @param text 二维码内容
 * @param width 宽
 * @param height 高
 */
export function createQrcode(id, text, width, height) {
  new QRCode(id, {
    width: width,
    height: height,
    text: text,
  })
}


