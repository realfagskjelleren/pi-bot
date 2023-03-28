import { Discord, Slash, SlashGroup } from "discordx";

@Discord()
@SlashGroup({ description: "Create instances in the server", name: "create", root: "moderate"})
@SlashGroup("create", "moderate")
class Create {
    @Slash({ description: "info"})
    info() {
        return "Create instances in the server";
    }
}