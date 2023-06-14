package server.example.javaServer.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "test")
public class Test {
    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("description")
    private String description;

    @Field("questions")
    private List<Question> questions;

    @Field("answers")
    private List<Integer> answers;

    @CreatedDate
    @Field("created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private LocalDateTime updatedAt;

    @Field("type_id")
    private Integer typeId;

    @Field("type_name")
    private String typeName;

    @Field("test_code")
    private String testCode;

    @Field("canSolve")
    private List<String> canSolve;
}
