
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Autorise le front-end à communiquer avec le back-end
public class BirthdayBackend {

    // On utilise une liste synchronisée pour éviter les bugs si plusieurs personnes écrivent en même temps
    private final List<AnonymousMessage> messages = Collections.synchronizedList(new LinkedList<>());

    // 1. Récupérer la date de l'anniversaire
    @GetMapping("/birthday-date")
    public Map<String, String> getTargetDate() {
        return Map.of("targetDate", "2026-12-25T00:00:00");
    }

    // 2. Recevoir un message anonyme
    @PostMapping("/messages")
    public Map<String, String> postMessage(@RequestBody Map<String, String> payload) {
        String text = payload.get("message");
        
        if (text == null || text.trim().isEmpty()) {
            return Map.of("status", "error", "message", "Le texte est vide !");
        }

        messages.add(new AnonymousMessage(text));
        return Map.of("status", "success", "message", "Ton mot doux a été enregistré.");
    }

    // 3. (Optionnel) Voir tous les messages reçus
    @GetMapping("/messages")
    public List<AnonymousMessage> getAllMessages() {
        return messages;
    }
}
