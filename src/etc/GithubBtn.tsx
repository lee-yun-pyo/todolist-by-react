import styled from "styled-components";

const Div = styled.div`
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 100000;
  background-color: #fff;
  color: #273c75;
  border-radius: 100px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease 0s;
  :hover {
    transform: translateY(-6px);
  }
  a {
    display: block;
    padding: 10px;
    cursor: pointer;
    width: 100%;
  }
`;

function GithubBtn() {
  return (
    <Div>
      <a
        href="https://github.com/lee-yun-pyo/todolist-by-react"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-github fa-2x"></i>
      </a>
    </Div>
  );
}

export default GithubBtn;
