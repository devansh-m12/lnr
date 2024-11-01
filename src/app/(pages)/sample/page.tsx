import { auth } from '@/auth';
import { signIn, signOut } from '@/auth';

export default async function Page() {
  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signIn();
        }}
      >
        <button type="submit">Sign in</button>
      </form>

      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
