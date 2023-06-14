package server.example.javaServer.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Results {
    @Field("answers")
    private List<Integer> answers;

    @Field("points")
    private int points;

    @Field("diagnosis")
    private String diagnosis;
}