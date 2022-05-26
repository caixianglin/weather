interface DotProps {
    width?: number;
    color?: string;
    styles?: any;
}

export default function Dot(props: DotProps) {
    const { width = 5, color = '#fff', styles = {} } = props;

    return (
        <div style={{width, height: width, backgroundColor: color, borderRadius: '50%', ...styles}} />
    );
}
