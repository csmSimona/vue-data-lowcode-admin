import html2canvas from 'html2canvas';
import { useMessage } from 'naive-ui';

const message = useMessage();

// TODO mock上传接口
const action = 'https://mock.apipark.cn/m1/1845243-0-default/api/v1/file/upload';

// 生成图片
export function createImg(dom: HTMLElement, fileName = '图片.jpg', type = 'download') {
  const setup = {
    useCORS: true // 使用跨域
  };
  return html2canvas(dom, setup).then(canvas => {
    const link = canvas.toDataURL('image/jpg'); // base64

    if (type === 'download') {
      exportPicture(link, fileName); // 下载图片
      message.success('下载成功');
      return true;
    }

    // 上传图片
    const formData = new FormData();
    formData.append(fileName, link);

    return fetch(action, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(({ data }) => {
        return data;
      })
      .catch(error => {
        message.error(error.message);
      });
  });
}

// 导出图片
export function exportPicture(link: string, name = '图片.jpg') {
  const file = document.createElement('a');
  file.style.display = 'none';
  file.href = link;
  file.download = decodeURI(name);
  document.body.appendChild(file);
  file.click();
  document.body.removeChild(file);
}
