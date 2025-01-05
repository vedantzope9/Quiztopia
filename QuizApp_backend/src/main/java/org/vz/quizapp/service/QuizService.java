package org.vz.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.vz.quizapp.exception.QuestionException;
import org.vz.quizapp.model.*;
import org.vz.quizapp.repo.QuestionRepo;
import org.vz.quizapp.repo.QuizRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {
    @Autowired
    private QuizRepo quizRepo;

    @Autowired
    private QuestionRepo questionRepo;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Questions> questions=questionRepo.findRandomQuestionsByCategory(category , numQ);

        Quiz quiz=new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionsList(questions);

        quizRepo.save(quiz);

        return new ResponseEntity<>("Quiz Created!" , HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQustions(int id) throws QuestionException {
        Optional<Quiz> quiz=quizRepo.findById(id);
        if(quiz.isPresent()){
            List<Questions> queFromDB=quiz.get().getQuestionsList();

            List<QuestionWrapper> queForUser=new ArrayList<>();

            for(Questions q:queFromDB){
                QuestionWrapper qw=new QuestionWrapper(q.getId() , q.getQuestion_title(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());

                queForUser.add(qw);
            }
            return new ResponseEntity<>(queForUser , HttpStatus.FOUND);
        }
        else
            throw new QuestionException("No such Quiz found");
    }

    public ResponseEntity<Integer> checkScore(Integer quizId, List<Response> responses) throws QuestionException {
        Optional<Quiz> quiz=quizRepo.findById(quizId);
        if(quiz.isPresent()){
            List<Questions> questions=quiz.get().getQuestionsList();
            int score=0,i=0;

            for(Response response : responses){
                if(response.getResponse().trim().equals(questions.get(i).getRight_ans().trim()))
                    score++;
                i++;
            }
            return new ResponseEntity<>(score , HttpStatus.OK);
        }
        else
            throw new QuestionException("No such Quiz Found!");
    }


    public ResponseEntity<List<Quiz>> getAllQuizes() {
        return new ResponseEntity<>(quizRepo.findAll() , HttpStatus.OK);
    }

    public ResponseEntity<List<Answers>> checkAnswers(Integer quizId, List<Response> responses) {
        List<Answers> answers=new ArrayList<>();

        for(Response response : responses){
            Questions que=questionRepo.findById(response.getId()).get();

            boolean b=false;
            if(response.getResponse().trim().equals(que.getRight_ans().trim())){
                b=true;
            }

            Answers ans=new Answers(que.getId() , que.getQuestion_title(), que.getOption1(), que.getOption2(), que.getOption3(),que.getOption4(), response.getResponse(),que.getRight_ans(), b);
            answers.add(ans);
        }
        return new ResponseEntity<>(answers , HttpStatus.OK);
    }
}
