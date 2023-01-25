# To Do List
**Typescript, React, Recoil을 활용한 사용자 지정 카테고리 To do List 구현**

https://lee-yun-pyo.github.io/todolist-by-react/
<br />
<br />

## 📌 Using
- react
- recoil
- styled-components
- typescript
- react-hook-form
<br />

## 🎨 UI
**1. 초기 화면**
<br />

<img src="https://user-images.githubusercontent.com/41375597/214510776-7029cb2f-8c0d-4a55-add6-1652697913c5.JPG" width=350 />

**2. 카테고리 추가**
<br />

<img src="https://user-images.githubusercontent.com/41375597/214510793-3bbae376-aaa0-41c7-bee7-6a74b8fd7e3a.JPG" width=350 />

**3. todo 입력**
<br />

<img src="https://user-images.githubusercontent.com/41375597/214510811-997e2276-cef0-4887-8f63-c3acba6e1b8b.JPG" width=350 />

**4. 기타: todo를 입력할 카테고리가 없을 때**
<br />

<img src="https://user-images.githubusercontent.com/41375597/214510848-0f70811f-b8de-4b83-a003-b0d1a99eff0d.JPG" width=350 />
<br />

## 🗂 Atoms
> **categoriesState**
- 카테고리 객체 (배열)
- 영속성 부여
- `default`를 `["TO_DO", "DOING", "DONE"]` 표기하여 초기 화면에 표시
<br />

> **selectedCategoryState**
- 사용자가 클릭을 통해 선택한 카테고리 객체
<br />

> **toDoState**
- 사용자가 입력한 todolist들의 객체 (배열)
- 영속성 부여
- `text`: 사용자로부터 입력받은 값, `id`: 입력했을때 `Date.now()` 값, `category`: `selectedCategoryState` 의 객체
<br />

> **AddListModalState**
- ‘카테고리 추가’ 버튼 클릭 시 모달창 화면 표시 여부 객체 (boolean)
<br />

> **toDoSelector**
- `toDoState` 객체들 중 `category`가 `selectedCategoryState` 객체와 일치하는 객체만 return
<br />

## 🧱 Components별 기능
> **CategoryBtns**
- 각 *카테고리* 별로 `toDoState`의 `category`가 각 *카테고리*와 일치하는 카테고리에 개수 표시 (1 이상일 경우)
- 각 카테고리 클릭 시 해당 카테고리로 `selectedCategoryState`의 객체 변경
<img src="https://user-images.githubusercontent.com/41375597/214515353-6eb96ccc-627c-4ab0-a385-be9206949372.jpg" height=100 />
<br />

> **CreateTodo**
- `input`에 `register` method의 `required` option 부여 (입력값 없이 `submit` 시도 시 에러메시지 출력)
- `categoriesState`의 객체의 길이가 0일 경우 (카테고리 개수가 0인 경우) `disabled` attribute 부여
- `form` submit 성공 시 `toDoState`객체 추가
<img src="https://user-images.githubusercontent.com/41375597/214515761-a41028b0-677c-4e23-a3b9-848e9c98c009.jpg" height=70 />
<br />

> **DeleteBts**
- ‘리스트 전체 삭제’ 버튼 클릭 시:
    - `toDoState`배열 객체 중 `selectedCategoryState`객체와 같은 카테고리를 가진 객체를 제외한 객체들로 상태 업데이트 ✅ 1
- ‘현재 카테고리 삭제’ 버튼 클릭 시:
    - ✅ 1 동일 기능 수행
    - `categoriesState` 배열 객체 중 `selectedCategoryState` 객체와 같은 객체를 제외한 객체들로 상태 업데이트
    - `selectedCategoryState` 상태 변경
<img src="https://user-images.githubusercontent.com/41375597/214515857-de9946d0-aa3d-4cf2-bf52-bb93972c5695.jpg" height=70 />
<br />

> **Todo**
- ‘카테고리 이름’ 클릭 시
    - `toDoState` 객체의 해당 todo의 `category` 변경
- ‘삭제’ 버튼 클릭 시
    - 삭제하려는 todo의 `id`값을 통해 `toDoState` 객체에서 삭제
<img src="https://user-images.githubusercontent.com/41375597/214515931-52652854-2ddc-4296-b55b-b3f371049a5f.JPG" height=70 />
<br />  
    
> **etc/ModalAddList**
- `text` 입력 후 ‘Save’버튼 클릭 시 `categoriesState` 배열 객체에 추가 및 입력한 텍스트로 `selectedCategoryState` 상태 변경
<img src="https://user-images.githubusercontent.com/41375597/214515997-37527884-f982-4839-b772-de326f37478d.jpg" width=300 />
<br />
