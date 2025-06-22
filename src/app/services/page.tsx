import { FC } from 'react';
import { loadServices } from '@/app/utils/content';
import s from './services.module.scss';
import ServicesList from '@/components/services/ServicesList';

const ServicesPage: FC = () => {
  const services = loadServices();

  return (
    <div className={s.services}>
      <div className={s.hero}>
        <h1>My Services</h1>
        <p>Here's what I can do for you.</p>
      </div>
      <ServicesList services={services} />
    </div>
  );
};

export default ServicesPage; 