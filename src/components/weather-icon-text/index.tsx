import Image from 'next/image';

interface Props {
  iconSrc: string;
  iconAlt: string;
  text: string;
}

export const WeatherIconText = ({ iconAlt, iconSrc, text }: Props) => {
  return (
    <div className='mt-4 flex items-center justify-center gap-4'>
      <Image src={iconSrc} width={30} height={30} alt={iconAlt} />
      <p className='text-xl text-white'>{text}</p>
    </div>
  );
};
