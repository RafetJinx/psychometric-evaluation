package server.example.javaServer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Field("id")
    private Integer id;

    @Field("question")
    private String question;

    @Field("options")
    private List<String> options;
}
