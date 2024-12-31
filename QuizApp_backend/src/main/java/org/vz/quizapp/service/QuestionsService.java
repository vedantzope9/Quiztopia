package org.vz.quizapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.vz.quizapp.model.Questions;
import org.vz.quizapp.repo.QuestionRepo;

import java.util.List;

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
}
