import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  AddListModalState,
  categoriesState,
  selectedCategoryState,
} from "../atoms";
import { useForm } from "react-hook-form";

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
  width: 440px;
  padding: 35px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transform: translateZ(1);
  transition: transform 0.25s ease-out;
  animation: mmslideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  @keyframes mmslideIn {
    from {
      transform: translateY(15%);
    }
    to {
      transform: translateY(0);
    }
  }
  @media (max-width: 420px) {
    width: 330px;
    padding: 30px;
  }
`;

const Icon = styled.i`
  color: #273c75;
  margin-bottom: 30px;
  @media (max-width: 420px) {
    margin-bottom: 25px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  padding: 13px;
  border-radius: 10px;
  font-size: 18px;
  border: none;
  border: 2px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  margin-bottom: 30px;
  &:focus {
    outline: none;
    border-color: #273c75;
  }
  @media (max-width: 420px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const BtnDiv = styled.div`
  display: flex;
`;

const Btn = styled.button`
  width: 90px;
  height: 45px;
  font-size: 17px;
  background-color: rgba(39, 60, 117, 0.9);
  border: none;
  cursor: pointer;
  border-radius: 7px;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgb(39, 60, 117);
    box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.05);
  }
  :first-child {
    margin-right: 20px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.5);
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      box-shadow: 0px 7px 8px rgba(0, 0, 0, 0.05);
    }
  }
  @media (max-width: 420px) {
    width: 75px;
    height: 40px;
  }
`;

function ModalAddList() {
  const { register, handleSubmit, setValue } = useForm();
  const [displayModal, setDisplayModal] = useRecoilState(AddListModalState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setCurrentCategory = useSetRecoilState(selectedCategoryState);
  const hideModal = () => {
    setDisplayModal(false);
  };
  const addCategory = (data: any) => {
    if (categories.includes(data.newCategory)) {
      window.alert("동일한 이름이 존재합니다.");
    } else {
      setCategories((prev) => [...prev, data.newCategory]);
      setValue("newCategory", "");
      setCurrentCategory(data.newCategory);
      setDisplayModal(false);
    }
  };
  return (
    <Modal showModal={displayModal}>
      <Overlay onClick={hideModal} />
      <Content>
        <Icon className="fa-solid fa-folder-plus fa-5x"></Icon>
        <Form onSubmit={handleSubmit(addCategory)}>
          <Input
            {...register("newCategory", { required: true })}
            placeholder="추가할 카테고리 제목을 입력하세요."
          />
          <BtnDiv>
            <Btn onClick={hideModal} type="button">
              Close
            </Btn>
            <Btn type="submit">Save</Btn>
          </BtnDiv>
        </Form>
      </Content>
    </Modal>
  );
}

export default ModalAddList;
