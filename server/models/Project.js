import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        language: {
            type: String,
            required: true,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        files: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                content: {
                    type: String,
                    default: "",
                },
                language: {
                    type: String,
                    default: "javascript",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;