import { Main } from './components/Main';
import { FaqSection } from './components/FaqSection';
import { Benefits } from './components/Benefits';
import { World } from './components/World';
import { PhotoSection } from './components/PhotoSection';
import ArticlesSection from './components/ArticlesSection';

export default function Home() {
  return (
    <main className='flex flex-col items-center '>
      <Main />
      <Benefits />
      <World />
      <PhotoSection />
      <ArticlesSection />
      <FaqSection />
    </main>
  );
}
