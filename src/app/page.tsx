import { Main } from './components/Main';
import { Faq } from './components/QAndA';
import { Solutions } from './components/Solutions';
import { Successes } from './components/Successes';
import { Team } from './components/Team';

export default function Home() {
  return (
    <main className='flex flex-col items-center '>
      <Main />
      <Solutions />
      <Successes />
      <Team />
      <Faq />
    </main>
  );
}
