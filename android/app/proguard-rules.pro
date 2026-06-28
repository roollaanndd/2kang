# Capacitor
-keep class com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**

# Capacitor plugins
-keep class com.omdc.dental.** { *; }

# WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Prevent crashes from missing annotations
-dontwarn javax.annotation.**

# Keep Parcelable implementations
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

# Hide source file names in stack traces
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable
