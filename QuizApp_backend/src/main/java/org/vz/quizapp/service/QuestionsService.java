package org.vz.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.vz.quizapp.exception.QuestionException;
import org.vz.quizapp.model.Questions;
import org.vz.quizapp.repo.QuestionRepo;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionsService {
    @Autowired
    public QuestionRepo repo;


    public List<Questions> getAllQuestions() {
        return repo.findAll();
    }

    public List<Questions> fetchByCategory(String categoryName) {
        return repo.findByCategory(categoryName);
    }

    public void addQuestions(Questions questions) {
        repo.save(questions);
    }

    public Questions getQuestionById(int id) throws QuestionException {
        return repo.findById(id).orElseThrow(() -> new QuestionException("No such Question found!"));
    }

    public void deleteQuestionById(int id)throws QuestionException {
        Optional<Questions> questions=repo.findById(id);
        if(questions.isPresent())
            repo.deleteById(id);
        else
            throw new QuestionException("Question Not Found!");
    }

    public void updateQuestion(Questions questions) throws QuestionException{
        Optional<Questions> question=repo.findById(questions.getId());
        if(question.isPresent())
            repo.save(questions);
        else
            throw new QuestionException("Question Not Found!");
    }
}
