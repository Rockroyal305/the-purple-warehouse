import { assert } from "console";
import {
    getEntries,
    getEntryByHash,
    addEntry,
    removeAll,
    getAll
} from "../helpers/tps";

const example = JSON.parse(
    JSON.stringify({
        metadata: {
            event: "2024camb",
            match: {
                level: "qm",
                number: 3,
                set: 1
            },
            bot: "9999",
            timestamp: 1711729092182,
            scouter: {
                name: "kabir",
                team: "1072",
                app: "tpw"
            }
        },
        abilities: {
            "auto-center-line-pick-up": false,
            "ground-pick-up": true,
            "auto-leave-starting-zone": true,
            "teleop-spotlight-2024": false,
            "teleop-stage-level-2024": 3
        },
        counters: {},
        data: {
            "auto-scoring-2024": ["ss", "sm"],
            "teleop-scoring-2024": ["ss", "as", "am", "as", "sa", "ts"],
            notes: "decent defense and intake always worked smoothly\ncycles were relatively slow though"
        },
        ratings: {
            "defense-skill": 3,
            "driver-skill": 3,
            "intake-consistency": 4,
            speed: 2,
            stability: 3
        },
        timers: {
            "brick-time": 1500,
            "defense-time": 6745,
            "stage-time-2024": 12815
        }
    })
);

let example2 = JSON.parse(JSON.stringify(example));
example2.metadata.event = "2023camb";

async function testExampleEntry(ex) {
    const timestamp = 1711729092182;
    let newEntry = await addEntry(ex, timestamp);
    console.log(`Added entry: ${newEntry.hash}, ${ex.metadata.event}`);
    console.assert(
        newEntry.serverTimestamp == timestamp,
        "Example timestamps do not match: " +
            newEntry.serverTimestamp +
            " vs " +
            timestamp
    );
    console.assert(newEntry.hash != null, "Example entry's hash is null");
    return newEntry;
}

async function testGetEntry(hash, query) {
    let entry = await getEntryByHash(hash);
    console.assert(entry != null, "Entry from getEntryByHash is null");
    let entries = await getEntries(query);
    console.assert(entries.length == 1, "Entries getEntries is not 1");
    console.assert(
        (entries[0] as any).hash == (entry as any).hash,
        "Entries from getEntries is not the same as entry from getEntryByHash"
    );
}

async function test() {
    await removeAll();
    const entry = await testExampleEntry(example);
    const entry2 = await testExampleEntry(example2);
    console.assert(
        entry.hash != entry2.hash,
        "Example entries have the same hash"
    );
    await testGetEntry(entry.hash, { "metadata.event": "2024camb" });
    await testGetEntry(entry2.hash, { "metadata.event": "2023camb" });
}

test();
