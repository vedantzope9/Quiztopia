package org.vz.quizapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class QuestionException extends Exception{
    public QuestionException(String msg) {
        super(msg);
    }
}
