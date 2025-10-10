interface MapProps {
  address: string;
}

export const GoogleMapEmbed = ({ address }: MapProps) => {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return <iframe src={mapSrc} className='w-full h-56' loading='lazy' allowFullScreen></iframe>;
};
