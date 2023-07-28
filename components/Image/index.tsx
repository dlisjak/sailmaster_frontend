import Image from 'next/image';

const MyImage = ({ src, alt, width, height }) => {
  let imgSrc = src;

  if (!src.includes('http')) {
    imgSrc = process.env.NEXT_PUBLIC_DOMAIN_URL + src;
  }

  return <img src={imgSrc} alt={alt} width={width} height={height} />;
};

export default MyImage;
