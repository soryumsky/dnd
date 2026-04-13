// ============================================================
// STORY DATA — Episode 1: The Shattered Crown
// Node-based branching narrative system
// Each scene: { id, type, title, narration, speaker, choices, stat_effects }
// Types: 'scene' | 'ending' | 'combat' | 'stat_check'
// ============================================================

const STORY_DATA = {
  episodes: [
    {
      id: "ep1",
      title: "The Shattered Crown",
      subtitle: "Episode I",
      description: "A dark curse grips the kingdom of Aelthar. A forgotten relic—the Shattered Crown—holds the key to salvation, or damnation. Your path begins at the edge of the Greyfen Swamp.",
      thumbnail: "⚔️",
      startScene: "intro",
      scenes: {

        // ─── INTRO ───────────────────────────────────────────
        "intro": {
          id: "intro",
          type: "scene",
          title: "The Road to Greyfen",
          bg: "swamp",
          narration: [
            "The year is 1312 of the Third Age. A plague of undead has spread from the cursed marshes of Greyfen, threatening to consume the Kingdom of Aelthar.",
            "You are {NAME}, a {CLASS} of {RACE} blood, summoned by a desperate king to seek the Shattered Crown—an ancient relic said to bind the dead to their graves.",
            "The village of Mosswick lies ahead, its torchlight flickering like a dying ember against the moonless sky. Screams drift across the bog."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Rush into the village to help the villagers", next: "mosswick_rush", stat_effects: { morality: +10, hp: -5 } },
            { text: "Scout the perimeter before entering", next: "mosswick_scout", stat_effects: { morality: 0 } },
            { text: "Seek high ground to assess the situation", next: "mosswick_observe", stat_effects: {} }
          ]
        },

        // ─── MOSSWICK PATHS ──────────────────────────────────
        "mosswick_rush": {
          id: "mosswick_rush",
          type: "scene",
          title: "Into the Fire",
          bg: "village",
          narration: [
            "You charge through the rotting gate. Three undead grotesques claw at a barricaded door. A child's sobbing echoes from within.",
            "Your instincts take over. You draw your weapon and strike, drawing the monsters away from the barricade.",
            "The fight is brutal and short. You drive them back into the fog, but not before one rakes a gash across your side.",
            "The door bursts open. An old woman rushes out, clutching a young boy. 'Bless you, stranger!' she cries. 'The Elder—he knows about the Crown. Seek him at the Chapel!'"
          ],
          speaker: "Narrator",
          choices: [
            { text: "Head immediately to the Chapel", next: "chapel_arrive", stat_effects: {} },
            { text: "Ask the woman about the undead plague first", next: "woman_info", stat_effects: { morality: +5 } }
          ]
        },

        "mosswick_scout": {
          id: "mosswick_scout",
          type: "scene",
          title: "Eyes in the Dark",
          bg: "swamp",
          narration: [
            "You circle the village quietly, stepping over roots and murky puddles. The undead cluster near the northern gate—perhaps eight of them, listless and slow.",
            "You spot a hooded figure slipping out through a gap in the southern fence. He moves with purpose, heading toward the bog.",
            "You have a choice: follow the mysterious figure, or enter the now-less-guarded village."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Follow the hooded figure into the bog", next: "follow_figure", stat_effects: {} },
            { text: "Enter through the southern gap", next: "chapel_arrive", stat_effects: {} },
            { text: "Lure the undead away with a distraction", next: "distraction", stat_effects: { morality: +5 } }
          ]
        },

        "mosswick_observe": {
          id: "mosswick_observe",
          type: "scene",
          title: "The Watcher",
          bg: "swamp",
          narration: [
            "You climb a dead oak at the swamp's edge. Below, Mosswick writhes with chaos. But your eye is drawn to something stranger—a pale blue light pulsing beneath the Chapel's stained window.",
            "More curious: a cloaked figure moves deliberately through the carnage, untouched by the undead. They enter the Chapel.",
            "You memorize the layout: two clusters of undead, one clear southern path, and whatever secret hides in that Chapel."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Descend and take the southern path to the Chapel", next: "chapel_arrive", stat_effects: {} },
            { text: "Study the undead movement patterns (take extra time)", next: "chapel_arrive_prepared", stat_effects: { morality: 0 } }
          ]
        },

        // ─── SIDE PATHS ──────────────────────────────────────
        "woman_info": {
          id: "woman_info",
          type: "scene",
          title: "The Elder's Warning",
          bg: "village",
          narration: [
            "'It started three nights ago,' the old woman says, her voice hollow with exhaustion. 'Elder Voss was performing a ritual. Said he found something—a broken crown in the bog. Claimed it would protect us.'",
            "'Instead it called THEM.' She spits toward a drifting corpse. 'He's locked himself in the Chapel. Won't come out. Won't let us in. But he's... changed.'",
            "The boy tugs your sleeve. 'I saw him talking to the dead ones. Through the window. Like they were listening.'"
          ],
          speaker: "Old Woman",
          choices: [
            { text: "Go to the Chapel with this knowledge", next: "chapel_arrive_warned", stat_effects: {} },
            { text: "Find a weapon to prepare for Elder Voss", next: "chapel_arrive_armed", stat_effects: {} }
          ]
        },

        "follow_figure": {
          id: "follow_figure",
          type: "scene",
          title: "Into the Bog",
          bg: "swamp",
          narration: [
            "The figure moves fast but you keep pace, feet sinking into cold mud. After ten minutes he stops at a mossy stone shrine half-swallowed by the earth.",
            "He pulls back his hood. A young man, no older than twenty, with hollow eyes that catch the moonlight like coins. He does not look surprised to see you.",
            "'I knew someone would follow,' he says softly. 'I am Daran. Apprentice to Elder Voss—or I was, before he found the Crown and lost his mind to it. I know where the first shard lies. But it is guarded by something I cannot face alone.'"
          ],
          speaker: "Daran",
          choices: [
            { text: "\"I will help you. Tell me everything.\"", next: "daran_alliance", stat_effects: { morality: +10 } },
            { text: "\"Why should I trust you?\"", next: "daran_distrust", stat_effects: {} },
            { text: "\"Lead me to the shard now.\"", next: "shard_direct", stat_effects: {} }
          ]
        },

        "distraction": {
          id: "distraction",
          type: "scene",
          title: "The Ruse",
          bg: "village",
          narration: [
            "You find a wagon and give it a push down the slope. It crashes into a fence with a magnificent clatter—perfect.",
            "The undead swarm toward the noise. The village is momentarily clear. You sprint for the Chapel, slipping through shadows.",
            "A sense of grim satisfaction settles over you. Sometimes the smart play is the right play."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Enter the Chapel", next: "chapel_arrive", stat_effects: {} }
          ]
        },

        // ─── CHAPEL ──────────────────────────────────────────
        "chapel_arrive": {
          id: "chapel_arrive",
          type: "scene",
          title: "The Chapel of Ash",
          bg: "chapel",
          narration: [
            "The Chapel door is unlocked but heavy. Inside, pews have been overturned into a rough circle. Candles burn in patterns that hurt to look at directly.",
            "At the altar kneels Elder Voss—a gaunt man in his sixties, his white robes streaked with dark stains. Before him, on a velvet cloth, rest two blackened fragments of a crown.",
            "He does not turn. 'Another hero,' he rasps. 'Come to take what you don't understand.'"
          ],
          speaker: "Narrator",
          choices: [
            { text: "\"Tell me about the Crown, Elder. I want to understand.\"", next: "voss_talk", stat_effects: { morality: +5 } },
            { text: "\"Step away from the crown fragments. Now.\"", next: "voss_confront", stat_effects: {} },
            { text: "Try to grab the crown fragments while he's kneeling", next: "voss_grab", stat_effects: { morality: -15 } }
          ]
        },

        "chapel_arrive_prepared": {
          id: "chapel_arrive_prepared",
          type: "scene",
          title: "The Chapel of Ash",
          bg: "chapel",
          narration: [
            "With the undead patterns memorized, you slip through their patrol gaps as if dancing between raindrops. You reach the Chapel unseen.",
            "Inside: Elder Voss kneels at the altar, two crown fragments before him. You noticed something the others wouldn't—from above, you saw a third figure hiding in the choir loft. Someone is already watching Voss.",
            "'Another hero,' Voss rasps without turning. 'Come to take what you don't understand.'"
          ],
          speaker: "Narrator",
          choices: [
            { text: "\"Tell me about the Crown, Elder.\"", next: "voss_talk", stat_effects: { morality: +5 } },
            { text: "Call out the hidden watcher in the loft", next: "reveal_watcher", stat_effects: {} },
            { text: "\"Step away from the crown fragments.\"", next: "voss_confront", stat_effects: {} }
          ]
        },

        "chapel_arrive_warned": {
          id: "chapel_arrive_warned",
          type: "scene",
          title: "The Fallen Elder",
          bg: "chapel",
          narration: [
            "Inside the Chapel, Elder Voss kneels at the altar. The old woman's words echo in your mind—he was talking to the dead ones.",
            "You watch him more carefully now. His lips move in a silent rhythm. The crown fragments before him pulse in time with his breathing.",
            "He turns slowly, and you see his eyes: pupils fully dilated, reflecting no light. He is no longer entirely himself.",
            "'You should not have come,' he says—but in two voices. His own, and something older beneath it."
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "\"Fight whatever possesses you, Elder!\"", next: "voss_fight_possession", stat_effects: { morality: +10 } },
            { text: "\"The possession is incomplete. How do I free you?\"", next: "voss_talk", stat_effects: { morality: +15 } },
            { text: "Strike before he can act", next: "voss_strike", stat_effects: { morality: -10 } }
          ]
        },

        "chapel_arrive_armed": {
          id: "chapel_arrive_armed",
          type: "scene",
          title: "Armed and Ready",
          bg: "chapel",
          narration: [
            "You find a smith's hammer on a fallen workbench—cold iron, a good weight. Iron weakens cursed things.",
            "Inside the Chapel, Elder Voss kneels at the altar. The crown fragments glow with a faint, sickly light.",
            "'Another hero,' he rasps. 'Come to take what you don't understand.'"
          ],
          speaker: "Narrator",
          choices: [
            { text: "\"Surrender the Crown, Elder.\" (Cold iron in hand)", next: "voss_iron_demand", stat_effects: {} },
            { text: "\"Tell me about the Crown first.\"", next: "voss_talk", stat_effects: {} }
          ]
        },

        // ─── VOSS ENCOUNTERS ─────────────────────────────────
        "voss_talk": {
          id: "voss_talk",
          type: "scene",
          title: "The Elder Speaks",
          bg: "chapel",
          narration: [
            "Voss is silent for a long moment. Then: 'The Shattered Crown was forged by King Maloreth the Undying three centuries ago. It does not protect the living. It controls the dead.'",
            "'I thought... if I could wield it... I could drive the plague away. Instead, it began calling to me. Whispering. Now I cannot let go.'",
            "He holds up his hands. The crown fragments have left dark veins crawling up his skin.",
            "'There are three shards. I have two. The third is in the Sunken Vault beneath this very chapel. If you destroy all three... the plague ends. But I... I may not survive the unbinding.'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "\"Where is the Sunken Vault? Take me there.\"", next: "vault_entrance", stat_effects: {} },
            { text: "\"I'll find another way to save you AND stop the plague.\"", next: "find_another_way", stat_effects: { morality: +15 } },
            { text: "\"The plague must end. Whatever the cost.\"", next: "vault_entrance", stat_effects: { morality: -5 } }
          ]
        },

        "voss_confront": {
          id: "voss_confront",
          type: "scene",
          title: "The Elder Rises",
          bg: "chapel",
          narration: [
            "Voss rises to his feet slowly. He is taller than you expected, and the shadows in the Chapel seem to gather around him.",
            "'You would command me? In MY chapel?' His voice carries a resonance that shakes the windowpanes.",
            "Then something shifts in his expression—a flash of the man beneath the curse. 'No. No, you're right. I... I can feel it pulling. Using me.'",
            "He sinks to his knees again. 'Please. The Vault beneath—the third shard is there. Destroy them all. It's the only way.'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "Take the two fragments and head to the Vault", next: "vault_entrance_fragments", stat_effects: {} },
            { text: "\"Come with me. Face this together.\"", next: "vault_together", stat_effects: { morality: +10 } }
          ]
        },

        "voss_grab": {
          id: "voss_grab",
          type: "scene",
          title: "The Price of Greed",
          bg: "chapel",
          narration: [
            "You lunge for the fragments—",
            "Voss's hand closes around your wrist like a vice. He turns, and his eyes are black as pitch. The thing wearing his face smiles.",
            "'Good,' it says with his mouth. 'Another vessel.'",
            "The crown fragments flare white. Pain splits through you. When the light fades, you are kneeling beside Voss, and you can no longer remember why you came here.",
            "The plague has a new servant."
          ],
          speaker: "Narrator",
          ending: "ending_vessel",
          choices: []
        },

        "voss_fight_possession": {
          id: "voss_fight_possession",
          type: "scene",
          title: "The War Within",
          bg: "chapel",
          narration: [
            "'Voss! Listen to my voice!'",
            "The Elder's body seizes. His hands claw at the altar. Two voices war in his throat—his own, ragged and desperate, and the Crown's voice, ancient and cold.",
            "'I... I remember...' Voss gasps. 'My daughter's name. Lyra. I remember.' The dark veins on his hands recede slightly.",
            "'The Vault. Beneath the third pew—a trapdoor. The final shard. If you destroy all three pieces... while I still have enough of myself to resist... it might work.'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "Move fast—find the trapdoor to the Vault", next: "vault_entrance", stat_effects: {} },
            { text: "\"Hold on, Voss. We do this together.\"", next: "vault_together", stat_effects: { morality: +10 } }
          ]
        },

        "voss_strike": {
          id: "voss_strike",
          type: "scene",
          title: "Cold Iron",
          bg: "chapel",
          narration: [
            "You strike fast. Voss crumples, unconscious but breathing. The dark light in his eyes fades.",
            "The two crown fragments lie on the velvet, dimmer now. You take them. They are lighter than you expected—and colder.",
            "Searching the chapel, you find a trapdoor beneath the third pew. The Vault."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Descend into the Vault", next: "vault_entrance_fragments", stat_effects: {} }
          ]
        },

        "voss_iron_demand": {
          id: "voss_iron_demand",
          type: "scene",
          title: "Cold Iron Commands",
          bg: "chapel",
          narration: [
            "You hold up the iron hammer. Voss recoils—whatever possesses him fears cold iron.",
            "'Back,' you say steadily. 'Whatever you are. Back.'",
            "The dark presence retreats like smoke from fire. Voss collapses, gasping. He looks at his hands—the veins have faded slightly.",
            "'The... Vault,' he manages. 'The last shard. You must destroy them all. Quickly, before it returns.'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "Secure the two fragments and find the Vault", next: "vault_entrance_fragments", stat_effects: { morality: +5 } },
            { text: "\"Can you walk? Come with me.\"", next: "vault_together", stat_effects: { morality: +10 } }
          ]
        },

        "reveal_watcher": {
          id: "reveal_watcher",
          type: "scene",
          title: "The Hidden Apprentice",
          bg: "chapel",
          narration: [
            "'Who's in the loft?' you call out.",
            "A startled noise. Then slow footsteps on the choir stairs. A young man descends—hollow-eyed, nervous, but alive.",
            "'I am Daran,' he says. 'Apprentice to Elder Voss. I've been watching, trying to find a moment to act, but I...' He swallows. 'I am not brave.'",
            "'The Vault beneath the chapel holds the final shard of the Crown. But something guards it—something Voss summoned before the corruption took him fully.'"
          ],
          speaker: "Daran",
          choices: [
            { text: "\"Help me reach the Vault, Daran.\"", next: "vault_with_daran", stat_effects: { morality: +5 } },
            { text: "Deal with Voss first, then the Vault", next: "voss_talk", stat_effects: {} }
          ]
        },

        // ─── DARAN PATHS ─────────────────────────────────────
        "daran_alliance": {
          id: "daran_alliance",
          type: "scene",
          title: "The Apprentice's Secret",
          bg: "swamp",
          narration: [
            "Daran exhales with relief. 'Thank you. The Crown was forged by Maloreth the Undying—it does not stop the undead. It commands them. Elder Voss didn't know until it was too late.'",
            "'There are three shards. The Elder has two. The third is in the Sunken Vault beneath the Chapel, guarded by a draugr knight—one of Maloreth's own guard, entombed with the shard for three centuries.'",
            "'I have a ritual that can weaken it—but I need time to perform it. Keep it occupied.' He presses a worn journal into your hands. 'My master's notes. They may help.'"
          ],
          speaker: "Daran",
          choices: [
            { text: "Go to the Chapel together", next: "vault_with_daran", stat_effects: {} },
            { text: "Study the journal first (bonus knowledge)", next: "study_journal", stat_effects: { morality: +5 } }
          ]
        },

        "daran_distrust": {
          id: "daran_distrust",
          type: "scene",
          title: "Earned Trust",
          bg: "swamp",
          narration: [
            "Daran doesn't flinch at your suspicion. 'Smart,' he says simply. 'A stranger in a cursed village—reasonable to be careful.'",
            "He pulls back his sleeve, revealing a sigil burned into his forearm: the Chapel's emblem. 'Apprentice seal. I've served Elder Voss for seven years. The Crown has taken him from me.'",
            "His voice breaks slightly. 'I just want to save what's left of him. Will you help me?'"
          ],
          speaker: "Daran",
          choices: [
            { text: "\"Alright. I believe you. What's the plan?\"", next: "daran_alliance", stat_effects: { morality: +5 } },
            { text: "\"I work alone. Tell me what I need to know.\"", next: "shard_direct", stat_effects: {} }
          ]
        },

        "shard_direct": {
          id: "shard_direct",
          type: "scene",
          title: "Straight to the Point",
          bg: "chapel",
          narration: [
            "You make your way to the Chapel without Daran. He calls after you—'At least take the journal!'—and tosses it to you before melting back into the shadows.",
            "Inside, Elder Voss kneels at the altar, two crown fragments before him. The room smells of ozone and old blood.",
            "He does not turn. 'Another hero,' he rasps."
          ],
          speaker: "Narrator",
          choices: [
            { text: "\"Tell me about the Crown, Elder.\"", next: "voss_talk", stat_effects: {} },
            { text: "\"Step away from the crown. Now.\"", next: "voss_confront", stat_effects: {} }
          ]
        },

        "study_journal": {
          id: "study_journal",
          type: "scene",
          title: "The Elder's Notes",
          bg: "swamp",
          narration: [
            "By moonlight, you read fragments of Elder Voss's journal. The handwriting grows increasingly erratic toward the final pages.",
            "'The Draugr Knight—Sentinel of Maloreth—can only be truly slain if its anchor shard is destroyed in its presence. Wounding it merely delays.'",
            "'Cold iron disrupts the Crown's signal. A bearer of the Crown fragments loses some control if iron is introduced nearby.'",
            "'The Crown's true purpose: not to raise the dead, but to make the living forget they fear death. That is Maloreth's real curse.'",
            "You close the journal, mind sharper. Daran watches you. 'Ready?'"
          ],
          speaker: "Narrator",
          choices: [
            { text: "\"Ready. Let's go.\"", next: "vault_with_daran", stat_effects: {} }
          ]
        },

        // ─── VAULT PATHS ─────────────────────────────────────
        "find_another_way": {
          id: "find_another_way",
          type: "scene",
          title: "A Desperate Search",
          bg: "chapel",
          narration: [
            "You search the Chapel frantically—Voss's books, his notes, the altar itself. The old man watches you with haunted eyes, fighting to stay present.",
            "In a hidden compartment behind a false saint's idol, you find a rolled parchment: the original ritual of Binding. A way to separate a host from the Crown's influence—if performed at the moment of the Crown's destruction.",
            "'There is a way,' you tell Voss.",
            "He begins to weep—the first human emotion you've seen from him. 'Then let us end this properly.'"
          ],
          speaker: "Narrator",
          choices: [
            { text: "Take Voss and the fragments to the Vault", next: "vault_together_ritual", stat_effects: { morality: +10 } }
          ]
        },

        "vault_entrance": {
          id: "vault_entrance",
          type: "scene",
          title: "The Sunken Vault",
          bg: "vault",
          narration: [
            "The trapdoor beneath the third pew groans open, releasing air that smells of centuries. Stone stairs descend into cold darkness.",
            "Your light reveals a vaulted chamber, its walls carved with reliefs of the dead rising. And at the far end, on a stone dais, the third shard glows with pale malevolence.",
            "Before it stands the Sentinel—a draugr in ancient plate armor, seven feet tall, its eyes twin points of cold blue fire.",
            "It turns toward you. Slowly. Deliberately. It has been waiting."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Charge the Sentinel—hit it hard and fast", next: "sentinel_fight_direct", stat_effects: { hp: -15 } },
            { text: "Look for a weakness before engaging", next: "sentinel_observe", stat_effects: {} },
            { text: "Try to reach the shard and destroy it first", next: "sentinel_shard_run", stat_effects: { hp: -10 } }
          ]
        },

        "vault_entrance_fragments": {
          id: "vault_entrance_fragments",
          type: "scene",
          title: "The Sunken Vault",
          bg: "vault",
          narration: [
            "The two fragments in your hand pulse faster as you descend the stairs—drawn toward the third.",
            "The Vault opens before you. Stone reliefs of the rising dead line every wall. And there: the Sentinel, armor ancient and massive, eyes burning cold blue.",
            "But you notice something—the fragment in your hand seems to confuse it slightly. The Sentinel's head tilts, as if receiving contradictory signals.",
            "You may be able to use this."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Use the fragments as bait—lure the Sentinel away from the dais", next: "sentinel_lure", stat_effects: {} },
            { text: "Direct combat—end this quickly", next: "sentinel_fight_direct", stat_effects: { hp: -15 } }
          ]
        },

        "vault_with_daran": {
          id: "vault_with_daran",
          type: "scene",
          title: "Two Against the Dark",
          bg: "vault",
          narration: [
            "Daran leads you through a hidden passage behind the altar—a longer route, but it brings you to the Vault's side chamber.",
            "You peer into the main chamber. The Sentinel stands motionless before the glowing shard.",
            "'The ritual takes three minutes,' Daran whispers. 'I'll begin. Keep it off me.'",
            "He begins drawing symbols on the floor with trembling hands. The Sentinel's head slowly turns."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Stand between Daran and the Sentinel", next: "sentinel_protect_daran", stat_effects: { morality: +10, hp: -10 } },
            { text: "Attack the Sentinel from behind while Daran draws", next: "sentinel_flanked", stat_effects: { hp: -5 } }
          ]
        },

        "vault_together": {
          id: "vault_together",
          type: "scene",
          title: "Unlikely Allies",
          bg: "vault",
          narration: [
            "Voss grips your arm with trembling hands and leads you to the trapdoor. Descending, he fights visible battles with whatever lives in the Crown fragments.",
            "'The Sentinel,' he gasps, 'will not... attack a bearer of the Crown. I still have enough... of its mark. I can distract it. You must reach the third shard. Smash them all together. Simultaneously.'",
            "He looks at you with clear eyes—the most lucid he's been. 'I may not survive the unbinding. But I need you to do it anyway. Please.'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "\"I understand. Let's do this.\"", next: "vault_climax_together", stat_effects: {} },
            { text: "\"I won't give up on finding a way to save you.\"", next: "vault_together_ritual", stat_effects: { morality: +15 } }
          ]
        },

        "vault_together_ritual": {
          id: "vault_together_ritual",
          type: "scene",
          title: "The Binding Ritual",
          bg: "vault",
          narration: [
            "In the Vault, with the Sentinel looming and the shard glowing, you produce the parchment—the Ritual of Binding.",
            "Voss reads it. His hands shake. 'This... this would work. But someone must perform the ritual on me while I hold the Crown together. The backlash will be...'",
            "He looks at the Sentinel. Then at you.",
            "'We have perhaps two minutes before it acts. What do you choose?'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "Perform the Binding Ritual on Voss while he holds the Crown", next: "ending_salvation", stat_effects: {} },
            { text: "Destroy all three shards—accept that Voss may be lost", next: "ending_sacrifice", stat_effects: {} }
          ]
        },

        // ─── SENTINEL COMBAT SCENES ──────────────────────────
        "sentinel_fight_direct": {
          id: "sentinel_fight_direct",
          type: "scene",
          title: "Steel and Bone",
          bg: "vault",
          narration: [
            "The Sentinel moves with terrible precision. For all its ancient bones, it fights like a master.",
            "You take hits. Your shield arm goes numb. But you are faster, and you learn its patterns.",
            "Blow by blow, you drive it back to the dais. Its armor cracks. Its blue eyes flicker.",
            "Your moment: while it's staggered, you seize the third shard from the dais."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Smash all three shards together on the stone floor", next: "ending_destruction", stat_effects: {} },
            { text: "Pause—look for a way to end this without full destruction", next: "vault_together_ritual", stat_effects: {} }
          ]
        },

        "sentinel_observe": {
          id: "sentinel_observe",
          type: "scene",
          title: "Know Your Enemy",
          bg: "vault",
          narration: [
            "You hold still. The Sentinel moves in a slow patrol pattern—three steps left, pause, three steps right. The shard on the dais is the anchor point.",
            "You notice: every time you move right, the Sentinel tracks right. It responds to movement, not sight.",
            "If you throw something left and move right—you could reach the dais in that moment of confusion.",
            "You hurl a loose stone to the left. The Sentinel lurches that direction. You sprint right."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Grab the third shard and destroy all three", next: "ending_destruction", stat_effects: {} }
          ]
        },

        "sentinel_shard_run": {
          id: "sentinel_shard_run",
          type: "scene",
          title: "The Run",
          bg: "vault",
          narration: [
            "You sprint for the dais. The Sentinel pivots with impossible speed and intercepts—its fist catches you across the shoulder and sends you sprawling.",
            "You're up before it reaches you. Bloodied but clear-headed. The shard is close. One more push.",
            "You feint left, go right, and close your fingers around the cold fragment. The Sentinel roars—a sound like ice cracking over a deep lake."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Smash all three shards together—end it now", next: "ending_destruction", stat_effects: { hp: -5 } },
            { text: "Use the pain and anger—channel it into the ritual", next: "vault_together_ritual", stat_effects: {} }
          ]
        },

        "sentinel_lure": {
          id: "sentinel_lure",
          type: "scene",
          title: "The Lure",
          bg: "vault",
          narration: [
            "You hold the fragments up, let them pulse and glow. The Sentinel tracks the signal—it takes two steps off the dais, then three.",
            "You back toward the far wall. It follows, confused by the Crown's divided call.",
            "Your moment: you drop and roll past it, reaching the dais. Your hands close around the third shard. All three pieces together, finally.",
            "The Sentinel freezes. Then slowly turns."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Smash all three shards before it can recover", next: "ending_destruction", stat_effects: {} }
          ]
        },

        "sentinel_protect_daran": {
          id: "sentinel_protect_daran",
          type: "scene",
          title: "Shield and Will",
          bg: "vault",
          narration: [
            "You plant yourself between Daran and the Sentinel. It hits you hard—again, again. You hold.",
            "Behind you, Daran chants, his voice rising. The symbols on the floor glow gold.",
            "'Done!' Daran shouts.",
            "The Sentinel stops. Its armor fractures. Its blue eyes go dark, one after the other, like candles snuffed. It crumples to the floor—ancient bones, nothing more.",
            "The third shard rolls off the dais, its glow extinguished."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Bring Daran's ritual and all three shards to the surface for the final unbinding", next: "ending_triumph", stat_effects: {} }
          ]
        },

        "sentinel_flanked": {
          id: "sentinel_flanked",
          type: "scene",
          title: "Caught Between",
          bg: "vault",
          narration: [
            "Your flanking strike staggers the Sentinel, buying Daran time. It turns on you, ignoring the ritual.",
            "You dance back, keeping it engaged. Daran's ritual glow brightens. The Sentinel's movements begin to stutter.",
            "'Now!' Daran shouts.",
            "The glow surges. The Sentinel collapses mid-swing. The third shard dims and goes cold."
          ],
          speaker: "Narrator",
          choices: [
            { text: "Take the shard and complete the unbinding above", next: "ending_triumph", stat_effects: {} }
          ]
        },

        "vault_climax_together": {
          id: "vault_climax_together",
          type: "scene",
          title: "Together into the Dark",
          bg: "vault",
          narration: [
            "Voss steps forward, Crown fragments in hand. The Sentinel turns—and pauses. It recognizes the Crown's bearer.",
            "In that moment, you reach the dais, close your hand around the third shard.",
            "All three pieces respond to each other, pulling together. The cold light intensifies to something almost beautiful.",
            "'Now,' Voss says calmly. 'Do it now, friend.'"
          ],
          speaker: "Elder Voss",
          choices: [
            { text: "Smash all three shards simultaneously", next: "ending_sacrifice", stat_effects: {} }
          ]
        },

        // ─── ENDINGS ─────────────────────────────────────────
        "ending_destruction": {
          id: "ending_destruction",
          type: "ending",
          title: "The Crown Shattered",
          bg: "vault",
          ending_id: "ending_destruction",
          ending_name: "The Destroyer",
          ending_icon: "💥",
          rarity: "common",
          narration: [
            "The three fragments come together with a sound like a thunderclap in a cathedral.",
            "The light is blinding. The Sentinel dissolves. Somewhere above, you hear the undead plague collapse—bodies dropping, the night going suddenly, mercifully quiet.",
            "When the light fades, you stand in a dark vault with three piles of black ash.",
            "You climb back to the surface. The village of Mosswick is still standing. The dead stay dead.",
            "Elder Voss is found slumped at the altar, alive but hollow—as if something essential has been removed along with the curse.",
            "They call you hero. You accept the title. But at night, you still see the cold blue eyes of the Sentinel, and wonder what other ancient things lie sleeping beneath forgotten chapels."
          ],
          speaker: "Narrator"
        },

        "ending_salvation": {
          id: "ending_salvation",
          type: "ending",
          title: "The Unbroken",
          bg: "chapel",
          ending_id: "ending_salvation",
          ending_name: "The Savior",
          ending_icon: "✨",
          rarity: "rare",
          narration: [
            "The ritual words fall from your lips like water. Voss shudders—you can see the Crown's grip breaking, dark veins fading, his breathing steadying.",
            "He holds the three united shards as they pulse and scream with ancient power. He does not break.",
            "'Let go,' he tells the Crown. 'Your king is long dead. Let go.'",
            "The shards detonate in a wave of white light that passes through stone, through bone, through every undead thing in the kingdom.",
            "When it clears, Voss sits on the Vault floor, alive. Wholly himself. Weeping.",
            "The plague is ended. The Elder lives. And you—you have found that sometimes the hardest path yields the brightest dawn.",
            "Songs will be sung of this night. Not of destruction, but of compassion in the dark."
          ],
          speaker: "Narrator"
        },

        "ending_sacrifice": {
          id: "ending_sacrifice",
          type: "ending",
          title: "The Price of Peace",
          bg: "vault",
          ending_id: "ending_sacrifice",
          ending_name: "The Unbinder",
          ending_icon: "🕯️",
          rarity: "rare",
          narration: [
            "The three shards destroy each other in your hands. The light is total.",
            "Voss makes no sound. He simply... unmakes. The Crown had become too intertwined with what he was.",
            "The plague dies with it. Every corpse in the kingdom settles back into honest earth. The night becomes still.",
            "You carry Voss's empty robes from the Vault. You do not tell the villagers what happened—only that the Elder died a hero, which is true.",
            "Mosswick survives. Aelthar survives. The cost of that survival has a name, and it is Voss, and you will not forget it.",
            "Years later, you will teach others: some monsters cannot be defeated cleanly. Choose your sacrifices wisely, and never forget who paid for your victories."
          ],
          speaker: "Narrator"
        },

        "ending_triumph": {
          id: "ending_triumph",
          type: "ending",
          title: "The Unlikely Fellowship",
          bg: "chapel",
          ending_id: "ending_triumph",
          ending_name: "The Bond-Keeper",
          ending_icon: "🤝",
          rarity: "uncommon",
          narration: [
            "With the Sentinel defeated and all three shards in hand, you and Daran return to the chapel.",
            "Daran performs the final ritual above Voss's unconscious form. The Crown's power drains safely, drawn into the ritual circle and dispersed.",
            "When Voss wakes, he does not remember the last three days. He looks at Daran—at you—with clear eyes.",
            "'You're all right,' Daran breathes, half-laughing, half-weeping.",
            "The village survives. The Elder lives. Daran becomes his master's peer instead of just his student.",
            "You leave Mosswick at dawn, the road open before you. You did not do this alone. That is not weakness—that is how great things are done.",
            "The kingdom names you Friend of Mosswick. But Daran's handshake as you parted means more than any title."
          ],
          speaker: "Narrator"
        },

        "ending_vessel": {
          id: "ending_vessel",
          type: "ending",
          title: "The Crown's New Voice",
          bg: "chapel",
          ending_id: "ending_vessel",
          ending_name: "The Fallen",
          ending_icon: "💀",
          rarity: "secret",
          narration: [
            "The Crown does not kill you. It has no reason to.",
            "In the months that follow, two crowns march side by side across the kingdom: Elder Voss and the one who came to stop him.",
            "The plague spreads. The living retreat. The kingdom of Aelthar becomes something else—a kingdom of the patient dead, waiting for the world to join them.",
            "Somewhere in the ruin of what you once were, something still remembers choosing wrong.",
            "But that memory grows fainter every day.",
            "This is not the ending you wanted. But it is the ending that chose you.",
            "Some doors, once opened, cannot be closed from the inside."
          ],
          speaker: "Narrator"
        }
      }
    }
  ]
};

// Helper: flatten all scenes from all episodes for quick lookup
function getScene(episodeId, sceneId) {
  const ep = STORY_DATA.episodes.find(e => e.id === episodeId);
  if (!ep) return null;
  return ep.scenes[sceneId] || null;
}
