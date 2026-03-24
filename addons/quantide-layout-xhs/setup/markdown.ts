import MdItAdmon from "markdown-it-admon";\n\nexport default function setup(md) {\n  md.use((MdItAdmon as any)?.default || MdItAdmon);\n}
