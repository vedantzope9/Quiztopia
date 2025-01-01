package org.vz.quizapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.vz.quizapp.model.Questions;

import java.util.List;

public interface QuestionRepo extends JpaRepository<Questions, Integer> {

    List<Questions> findByCategory(String categoryName);

    @Query(value = "SELECT * FROM Questions q WHERE q.category = ?1 ORDER BY RAND() LIMIT ?2", nativeQuery = true)
    List<Questions> findRandomQuestionsByCategory(String category, int numQ);

    //when we have to use the variables use colon(: )
}
