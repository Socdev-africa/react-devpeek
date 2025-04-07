// components/CustomJsonViewer.tsx
import React, { useState } from 'react';

interface JsonViewerProps {
    data: any;
    rootName?: string | boolean;
    expandLevel?: number;
    theme?: 'light' | 'dark';
}

const CustomJsonViewer: React.FC<JsonViewerProps> = ({
    data,
    rootName = false,
    expandLevel = 1,
    theme = 'light'
}) => {
    return (
        <div className={`custom-json-viewer ${theme}`}>
            <JsonNode
                name={rootName === false ? undefined : rootName?.toString() ?? 'root'}
                data={data}
                level={0}
                expandLevel={expandLevel}
                theme={theme}
            />
        </div>
    );
};

interface JsonNodeProps {
    name?: string;
    data: any;
    level: number;
    expandLevel: number;
    theme: 'light' | 'dark';
}

const JsonNode: React.FC<JsonNodeProps> = ({ name, data, level, expandLevel, theme }) => {
    const [isExpanded, setIsExpanded] = useState(level < expandLevel);

    const getDataType = (value: any): string => {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    };

    const dataType = getDataType(data);
    const isExpandable = ['object', 'array'].includes(dataType) && data !== null;

    const getValue = () => {
        switch (dataType) {
            case 'null':
                return <span className="json-null">null</span>;
            case 'string':
                return <span className="json-string">"{data}"</span>;
            case 'number':
            case 'boolean':
                return <span className="json-literal">{String(data)}</span>;
            case 'array':
                return isExpanded ? (
                    <div className="json-children">
                        {data.map((item: any, index: number) => (
                            <JsonNode
                                key={index}
                                name={String(index)}
                                data={item}
                                level={level + 1}
                                expandLevel={expandLevel}
                                theme={theme}
                            />
                        ))}
                    </div>
                ) : (
                    <span className="json-preview">
                        Array[{data.length}]
                    </span>
                );
            case 'object':
                return isExpanded ? (
                    <div className="json-children">
                        {Object.keys(data).map(key => (
                            <JsonNode
                                key={key}
                                name={key}
                                data={data[key]}
                                level={level + 1}
                                expandLevel={expandLevel}
                                theme={theme}
                            />
                        ))}
                    </div>
                ) : (
                    <span className="json-preview">
                        {`{${Object.keys(data).length} keys}`}
                    </span>
                );
            default:
                return <span>Unknown type</span>;
        }
    };

    const toggleExpand = () => {
        if (isExpandable) {
            setIsExpanded(!isExpanded);
        }
    };

    const colors = {
        light: {
            property: 'rgb(6, 125, 23)',
            string: 'rgb(196, 26, 22)',
            number: 'rgb(28, 0, 207)',
            boolean: 'rgb(28, 0, 207)',
            null: 'rgb(128, 128, 128)',
            preview: 'rgb(128, 128, 128)'
        },
        dark: {
            property: 'rgb(103, 205, 135)',
            string: 'rgb(244, 113, 140)',
            number: 'rgb(87, 157, 255)',
            boolean: 'rgb(87, 157, 255)',
            null: 'rgb(182, 182, 182)',
            preview: 'rgb(182, 182, 182)'
        }
    };

    const colorTheme = theme === 'dark' ? colors.dark : colors.light;

    const styles = {
        container: {
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            position: 'relative' as const,
            marginLeft: name ? '0.5rem' : '0',
            paddingLeft: name ? '1rem' : '0',
        },
        property: {
            color: colorTheme.property,
            marginRight: '0.5rem',
            cursor: isExpandable ? 'pointer' : 'default',
        },
        string: {
            color: colorTheme.string,
        },
        literal: {
            color: dataType === 'number' || dataType === 'boolean' ? colorTheme.number : colorTheme.null,
        },
        expand: {
            display: 'inline-block',
            width: '1rem',
            cursor: 'pointer',
            userSelect: 'none' as const,
        },
        preview: {
            color: colorTheme.preview,
            fontStyle: 'italic',
        },
        children: {
            marginLeft: '1.5rem',
        }
    };

    return (
        <div style={styles.container}>
            {isExpandable ? (
                <span style={styles.expand} onClick={toggleExpand}>
                    {isExpanded ? '▼' : '▶'}
                </span>
            ) : (
                <span style={styles.expand}>&nbsp;</span>
            )}

            {name !== undefined && (
                <span
                    style={styles.property}
                    onClick={isExpandable ? toggleExpand : undefined}
                >
                    {name}:
                </span>
            )}

            {getValue()}
        </div>
    );
};

export default CustomJsonViewer;