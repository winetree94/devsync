# JDK
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
if [ -d "$JAVA_HOME" ]; then
  export PATH="$JAVA_HOME/bin:$PATH"
fi

# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk
if [ -d "$ANDROID_HOME" ]; then
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
fi

export ANDROID_NDK_HOME=$ANDROID_HOME/ndk/26.1.10909125
if [ -d "$ANDROID_NDK_HOME" ]; then
  export PATH=$PATH:$ANDROID_NDK_HOME
fi
