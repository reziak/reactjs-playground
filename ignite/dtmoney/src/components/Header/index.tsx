import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onHandleOpenModal: () => void;
}

export function Header(props: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney" />
        <button type="button" onClick={props.onHandleOpenModal}>
          Nova transação
        </button>
      </Content>
      
    </Container>
  )
}