package server.example.javaServer.model.info.mixedInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DptPatientInfo {
    private String id;

    private String name;

    private String surname;
}
