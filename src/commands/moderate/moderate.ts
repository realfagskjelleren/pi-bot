import { Discord, Slash, SlashGroup } from "discordx";

@Discord()
@SlashGroup({ description: "Moderate the server", name: "moderate"})
@SlashGroup("moderate")
class Moderate {
    @Slash({ description: "info"})
    info() {
        return "Moderate the server";
    }
}
// @SlashGroup({ descriptoin: "Create insatnces in the server", name: "create", root: "moderate"});