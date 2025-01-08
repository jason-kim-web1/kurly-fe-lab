import LoginForm from '../components/Login/Form';
import SessionButton from '../components/Session/Button';

export default function Page() {
  return (
    <article>
      <section>
        <h4>로그인</h4>
        <LoginForm />
      </section>
      <section>
        <h4>세션 요청</h4>
        <SessionButton />
      </section>
    </article>
  );
}
