package server.example.javaServer.model.info.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestInfo {
    private String id;
    private String name;
    private String testCode;
}
