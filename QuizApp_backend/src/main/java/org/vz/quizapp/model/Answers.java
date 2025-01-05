package org.vz.quizapp.model;

import lombok.Data;

@Data
public class Answers {
    private int id;
    private String question_title;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String userResponse;
    private String right_ans;
    private boolean isCorrect;

    public Answers(int id, String question_title, String option1, String option2, String option3, String option4, String userResponse, String right_ans, boolean isCorrect) {
        this.id = id;
        this.question_title = question_title;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.userResponse = userResponse;
        this.right_ans = right_ans;
        this.isCorrect = isCorrect;
    }

    @Override
    public String toString() {
        return "Answers{" +
                "id=" + id +
                ", question_title='" + question_title + '\'' +
                ", option1='" + option1 + '\'' +
                ", option2='" + option2 + '\'' +
                ", option3='" + option3 + '\'' +
                ", option4='" + option4 + '\'' +
                ", userResponse='" + userResponse + '\'' +
                ", right_ans='" + right_ans + '\'' +
                ", isCorrect=" + isCorrect +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestion_title() {
        return question_title;
    }

    public void setQuestion_title(String question_title) {
        this.question_title = question_title;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public String getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(String userResponse) {
        this.userResponse = userResponse;
    }

    public String getRight_ans() {
        return right_ans;
    }

    public void setRight_ans(String right_ans) {
        this.right_ans = right_ans;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
