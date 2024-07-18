import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/components/footer/footer';

export default component$(() => {
  return (
    <>
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
