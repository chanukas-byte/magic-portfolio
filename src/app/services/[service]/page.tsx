import { FC } from 'react';
import { CustomMDX } from '@/components/mdx';
import { loadService, loadServices } from '@/app/utils/content';
import { notFound } from 'next/navigation';
import s from './service.module.scss';

interface ServicePageProps {
  params: {
    service: string;
  };
}

const ServicePage: FC<ServicePageProps> = ({ params }) => {
  const service = loadService(params.service);

  if (!service) {
    notFound();
  }

  return (
    <div className={s.service}>
      <div className={s.hero}>
        <h1>{service.meta.title}</h1>
        <p>{service.meta.description}</p>
      </div>
      <div className={s.body}>
        <CustomMDX source={service.content} />
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const services = loadServices();
  return services.map((service) => ({
    service: service.meta.slug,
  }));
}

export default ServicePage; 