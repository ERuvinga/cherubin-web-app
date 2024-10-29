import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const BackHomeBtn = () => {
  const navigation = useRouter();
  return (
    <div className="containerBtnToHome" onClick={() => navigation.back()}>
      <div className="BtnToHome">
        <ArrowLeftIcon className="Icone" />
      </div>
    </div>
  );
};

export default BackHomeBtn;
