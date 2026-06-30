import type { Metadata } from 'next';
import Link from 'next/link';
import NewTopicForm from '@/components/NewTopicForm';

export const metadata: Metadata = {
  title: 'Создать обсуждение — форум Jondey',
  description: 'Создайте обсуждение о ремонте: задайте вопрос или поделитесь опытом и фото.',
  robots: { index: false },
};

export default function NewTopicPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/forum" className="text-sm text-slate-500 hover:text-brand">
        ← К обсуждениям
      </Link>
      <h1 className="mt-3 text-3xl font-extrabold">Новое обсуждение</h1>
      <p className="mt-2 text-slate-500">
        Спросите совета, поделитесь идеей или покажите свой ремонт.
      </p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <NewTopicForm />
      </div>
    </div>
  );
}
