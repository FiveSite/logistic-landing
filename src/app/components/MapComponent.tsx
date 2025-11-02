interface MapProps {
  address: string;
  className?: string;
}

export const GoogleMapEmbed = ({ address, className }: MapProps) => {
  const encodedAddress = encodeURIComponent(address);
  const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&output=embed`;

  return <iframe src={mapSrc} className={className} loading='lazy' allowFullScreen></iframe>;
};
