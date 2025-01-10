# 🩵 프로젝트 제목
컴퓨터정보공학부 홈페이지

## 🚀 소개
컴퓨터정보공학부의 공지사항, 자료, 정보, QnA 등이 있는 홈페이지입니다.

## 🛠️ 기술 스택
| **Category** | **Stack** |
|:------------:|:----------:|
| Back-end | NodeJS |
| Database | Supabase |
| Front-end | React |

## ✏️ 작업 프로세스

1. **레포지토리 복제**
   - `git clone <레포지토리 URL>` 명령어를 사용하여 로컬 환경에 레포지토리를 복제합니다.

2. **작업 내용 Issues에 등록**
   - 작업할 내용을 [Issues](./issues) 탭에 등록합니다.
   - 각 Issue는 한 가지 작업(단일 기능, 버그 수정 등)만 포함하도록 합니다.

3. **브랜치 생성**
   - 작업할 내용을 반영한 브랜치 이름을 생성합니다. 브랜치 이름은 [Branch Naming Convention](https://band-collar-06a.notion.site/15fcf133eeae8018a732fbb21afc9053)을 따릅니다.
   - *브랜치 생성 방법*
   - 1. 작업 할 Issue 선택
     2. 오른쪽 서브메뉴에서 Development 탭에 있는 Create branch 클릭
     3. Branch name 을 브랜치 네이밍 컨벤션에 맞게 수정
     4. checkout locally 선택
     5. Create branch 클릭
     6. 해당 내용을 복사 후 터미널에 붙여넣기
     7. 작업 시작

4. **작업 시작**
   - 브랜치에서 필요한 코드를 작성하거나 변경합니다.
   - 작업하는 중에 commit 단위는 작은 단위로 합니다.(한 줄로 설명 가능한 단위)

5. **작업 완료**

6. **로컬 테스트**
   - 변경 사항이 올바르게 작동하는지 로컬 환경에서 테스트를 수행합니다.
   - 필요한 경우 테스트 코드를 작성하거나 수정합니다.

7. **작업 브랜치 푸쉬**
   - 작업 브랜치를 원격 저장소로 푸쉬합니다.
   - 예: `git push origin <작업 브랜치 이름>`

8. **Pull Request 작성**
   - PullRequest 컨벤션(초안 작성되어 있음)에 따라 Pull Request를 작성합니다.
   - PR 제목: `[타입] 작업 내용`
   - 예: `[Feature] 사용자 로그인 기능 추가`

9. **팀원 리뷰**
   - 팀원이 Pull Request를 검토합니다. 피드백을 반영한 후 리뷰를 다시 요청합니다.

10. **Merge**
    - 리뷰가 완료되고 팀원들의 동의를 얻은 후 작업자 자신이 브랜치를 `develop` 브랜치에 병합합니다.
    - 병합 후 작업 브랜치를 삭제합니다.
    - 예: `git branch -d <작업 브랜치 이름>`

## 💻 설치 방법
   1. 의존성을 설치합니다:
      ```js
      // front
      cd ./frontend
      npm install

      // backend
      cd ./backend
      npm install
      ```
   2. 애플리케이션을 시작합니다:
      ```js
      // front
      npm dev run

      // backend
      - npm dev run  // nodemon
      - npm start  // app.js 실행
      ```


## 👥 팀원
- 조성찬: BE Developer
- 강준우: BE Developer
- 이용진: BE Developer
- 권관호: BE Developer
- 오지빈: FE Developer
