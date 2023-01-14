import styled from "styled-components";
import { useRecoilState } from "recoil";
import { AddListModalState } from "../atoms";

const Modal = styled.div<{ showModal: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.showModal ? "" : "none")};
`;
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Content = styled.div`
  background-color: #fff;
  position: relative;
  width: 30%;
  padding: 35px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transform: translateZ(1);
  transition: transform 0.25s ease-out;
  animation: mmslideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
  @keyframes mmfadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes mmfadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes mmslideIn {
    from {
      transform: translateY(15%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes mmslideOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10%);
    }
  }
`;

const Input = styled.input`
  padding: 13px;
  border-radius: 10px;
  font-size: 15px;
  border: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: #00b894;
  }
`;

const BtnDiv = styled.div``;

const Btn = styled.button`
  padding: 9px 13px;
  font-size: 14px;
  font-weight: 600;
  background-color: #00b894;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #55efc4;
  }
  :first-child {
    margin-right: 10px;
  }
`;

function ModalAddList() {
  const [displayModal, setDisplayModal] = useRecoilState(AddListModalState);
  const hideModal = () => {
    setDisplayModal(false);
  };
  return (
    <Modal showModal={displayModal}>
      <Overlay onClick={hideModal} />
      <Content>
        <Input placeholder="추가할 리스트 제목을 입력하세요." />
        <BtnDiv>
          <Btn onClick={hideModal}>취소</Btn>
          <Btn>저장</Btn>
        </BtnDiv>
      </Content>
    </Modal>
  );
}

export default ModalAddList;
