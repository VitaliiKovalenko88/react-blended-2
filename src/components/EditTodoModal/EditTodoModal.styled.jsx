import styled from '@emotion/styled';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: rgba(92, 88, 88, 0.573);
`;

export const ModalEdit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 100px;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditForm = styled.form``;
export const EditInput = styled.input`
  padding: 15px;
  height: 30px;
  margin-right: 15px;
  border-radius: 20px;
  border: 1px solid black;
`;
export const EditBtn = styled.button`
  width: 100px;
  height: 30px;
  background-color: #7a7070;
  color: #fff;
  border-radius: 20px;
`;
