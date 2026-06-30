import { redirect } from 'next/navigation';

// `/` has no content of its own — Projects is the home of the app.
export default function Home() {
  redirect('/projects');
}
