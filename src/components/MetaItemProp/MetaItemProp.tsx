import { FC } from 'react';

type MetaItemPropProps = {
  fullPathUrl: string;
  headline: string;
  alternativeHeadline?: string;
};

const MetaItemProp: FC<MetaItemPropProps> = ({
  fullPathUrl,
  headline,
  alternativeHeadline,
}) => (
  <>
    <meta content={fullPathUrl} itemProp="url" />
    <meta content={headline} itemProp="headline" />
    {alternativeHeadline && <meta content={alternativeHeadline} itemProp="alternativeHeadline" />}
  </>
);

export default MetaItemProp;
