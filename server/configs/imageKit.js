import ImageKit from '@imagekit/nodejs';

const imageKit = new ImageKit({
  privateKey: process.envIMAGEKIT_PRIVATE_KEY 
});

export default imageKit