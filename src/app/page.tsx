import { FaqSection } from './components/FaqSection';
import { Benefits } from './components/Benefits';
import { World } from './components/World';
import { PhotoSection } from './components/PhotoSection';
import ArticlesSection from './components/ArticlesSection';
import { MainComponent } from './components/MainComponent';

export default function Home() {
  return (
    <main className='flex flex-col items-center '>
      <MainComponent />
      <Benefits />
      <World />
      <PhotoSection />
      <ArticlesSection />
      <FaqSection />
    </main>
  );
}
